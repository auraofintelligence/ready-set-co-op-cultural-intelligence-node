"""Convert a DOCX document into a plain, source-faithful Markdown edition."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

from docx import Document
from docx.table import Table
from docx.text.hyperlink import Hyperlink
from docx.text.paragraph import Paragraph
from docx.oxml.table import CT_Tbl
from docx.oxml.text.paragraph import CT_P


def clean(value: str) -> str:
    value = value.replace("\u00a0", " ").replace("\u2013", "-").replace("\u2014", "-")
    value = re.sub(r"[ \t]+", " ", value)
    return value.strip()


def inline_markdown(paragraph: Paragraph) -> str:
    parts = []
    for item in paragraph.iter_inner_content():
        if isinstance(item, Hyperlink):
            label = clean(item.text).replace("[", "\\[").replace("]", "\\]")
            parts.append(f"[{label}]({item.url})" if item.url and label else label)
        else:
            parts.append(item.text)
    return clean("".join(parts))


def paragraph_markdown(paragraph: Paragraph) -> str:
    text = inline_markdown(paragraph)
    if not text:
        return ""
    style = (paragraph.style.name if paragraph.style else "").lower()
    if style == "title":
        return f"# {text}"
    if style == "subtitle":
        return f"*{text}*"
    heading = re.search(r"heading\s*([1-6])", style)
    if heading:
        level = min(int(heading.group(1)) + 1, 6)
        return f"{'#' * level} {text}"
    if "section label" in style:
        return f"## {text}"
    if "minor heading" in style:
        return f"### {text}"
    if "recommendation" in style:
        return f"> **Recommendation:** {text}"
    if paragraph._p.pPr is not None and paragraph._p.pPr.numPr is not None:
        return f"1. {text}"
    if text.startswith(("• ", "· ", "▪ ", "◦ ")):
        return f"- {text[2:].strip()}"
    return text


def table_markdown(table: Table) -> str:
    rows = []
    for row in table.rows:
        cells = []
        for cell in row.cells:
            value = "<br>".join(inline_markdown(paragraph) for paragraph in cell.paragraphs if inline_markdown(paragraph))
            cells.append(value.replace("|", "\\|"))
        rows.append(cells)
    if not rows:
        return ""
    width = max(len(row) for row in rows)
    rows = [row + [""] * (width - len(row)) for row in rows]
    header = rows[0]
    output = [f"| {' | '.join(header)} |", f"| {' | '.join(['---'] * width)} |"]
    output.extend(f"| {' | '.join(row)} |" for row in rows[1:])
    return "\n".join(output)


def convert(source: Path, destination: Path) -> None:
    document = Document(source)
    blocks = []
    for child in document.element.body.iterchildren():
        if isinstance(child, CT_P):
            rendered = paragraph_markdown(Paragraph(child, document))
        elif isinstance(child, CT_Tbl):
            rendered = table_markdown(Table(child, document))
        else:
            continue
        if rendered:
            blocks.append(rendered)
    note = (
        "<!-- Public Markdown edition generated from the supplied DOCX. "
        "Wording and document order are preserved; page layout and Word-only formatting are normalised. -->"
    )
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(f"{note}\n\n" + "\n\n".join(blocks) + "\n", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("destination", type=Path)
    args = parser.parse_args()
    convert(args.source, args.destination)
    print(args.destination)


if __name__ == "__main__":
    main()
