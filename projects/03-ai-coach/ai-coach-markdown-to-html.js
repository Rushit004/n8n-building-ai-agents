function markdownToHtml(markdown) {

    if (!markdown) {
        return '';
    }

    // Normalize line endings
    let html = markdown
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .trim();

    // Escape HTML characters
    html = html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // --------------------------------------------------
    // CODE BLOCKS
    // --------------------------------------------------

    html = html.replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        function(match, language, code) {

            const lang = language
                ? ` class="language-${language}"`
                : '';

            return `<pre><code${lang}>${code.trim()}</code></pre>`;
        }
    );

    // --------------------------------------------------
    // HEADINGS
    // --------------------------------------------------

    html = html
        .replace(/^###### (.*)$/gm, '<h6>$1</h6>')
        .replace(/^##### (.*)$/gm, '<h5>$1</h5>')
        .replace(/^#### (.*)$/gm, '<h4>$1</h4>')
        .replace(/^### (.*)$/gm, '<h3>$1</h3>')
        .replace(/^## (.*)$/gm, '<h2>$1</h2>')
        .replace(/^# (.*)$/gm, '<h1>$1</h1>');

    // --------------------------------------------------
    // HORIZONTAL RULE
    // --------------------------------------------------

    html = html.replace(
        /^(\*\*\*|---|___)$/gm,
        '<hr>'
    );

    // --------------------------------------------------
    // BLOCKQUOTES
    // --------------------------------------------------

    html = html.replace(
        /^> (.*)$/gm,
        '<blockquote>$1</blockquote>'
    );

    // --------------------------------------------------
    // CHECKBOXES
    // --------------------------------------------------

    html = html.replace(
        /^- \[x\] (.*)$/gim,
        '<li><input type="checkbox" checked disabled> $1</li>'
    );

    html = html.replace(
        /^- \[ \] (.*)$/gm,
        '<li><input type="checkbox" disabled> $1</li>'
    );

    // --------------------------------------------------
    // LINKS
    // --------------------------------------------------

    html = html.replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // --------------------------------------------------
    // IMAGES
    // --------------------------------------------------

    html = html.replace(
        /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)\)/g,
        '<img src="$2" alt="$1">'
    );

    // --------------------------------------------------
    // INLINE CODE
    // --------------------------------------------------

    html = html.replace(
        /`([^`]+)`/g,
        '<code>$1</code>'
    );

    // --------------------------------------------------
    // BOLD + ITALIC
    // --------------------------------------------------

    html = html.replace(
        /\*\*\*(.*?)\*\*\*/g,
        '<strong><em>$1</em></strong>'
    );

    html = html.replace(
        /___(.*?)___/g,
        '<strong><em>$1</em></strong>'
    );

    // Bold
    html = html.replace(
        /\*\*(.*?)\*\*/g,
        '<strong>$1</strong>'
    );

    html = html.replace(
        /__(.*?)__/g,
        '<strong>$1</strong>'
    );

    // Italic
    html = html.replace(
        /(?<!\*)\*([^*\n]+)\*(?!\*)/g,
        '<em>$1</em>'
    );

    html = html.replace(
        /(?<!_)_([^_\n]+)_(?!_)/g,
        '<em>$1</em>'
    );

    // --------------------------------------------------
    // NUMBERED LISTS
    // --------------------------------------------------

    html = html.replace(
        /(?:^|\n)((?:\d+\. .+(?:\n|$))+)/g,
        function(match, list) {

            const items = list
                .trim()
                .split('\n')
                .map(item => {
                    return item.replace(
                        /^\d+\. (.*)$/,
                        '<li>$1</li>'
                    );
                })
                .join('');

            return `\n<ol>${items}</ol>\n`;
        }
    );

    // --------------------------------------------------
    // BULLET LISTS
    // --------------------------------------------------

    html = html.replace(
        /(?:^|\n)((?:[-*+] .+(?:\n|$))+)/g,
        function(match, list) {

            const items = list
                .trim()
                .split('\n')
                .map(item => {
                    return item.replace(
                        /^[-*+] (.*)$/,
                        '<li>$1</li>'
                    );
                })
                .join('');

            return `\n<ul>${items}</ul>\n`;
        }
    );

    // --------------------------------------------------
    // TABLES
    // --------------------------------------------------

    html = html.replace(
        /((?:^\|.*\|$\n?)+)/gm,
        function(match) {

            const lines = match
                .trim()
                .split('\n');

            if (lines.length < 2) {
                return match;
            }

            // Check whether second row is table separator
            if (!/^\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?$/.test(lines[1])) {
                return match;
            }

            const headers = lines[0]
                .replace(/^\||\|$/g, '')
                .split('|')
                .map(x => x.trim());

            let table = '<table><thead><tr>';

            headers.forEach(header => {
                table += `<th>${header}</th>`;
            });

            table += '</tr></thead><tbody>';

            for (let i = 2; i < lines.length; i++) {

                const cells = lines[i]
                    .replace(/^\||\|$/g, '')
                    .split('|')
                    .map(x => x.trim());

                table += '<tr>';

                cells.forEach(cell => {
                    table += `<td>${cell}</td>`;
                });

                table += '</tr>';
            }

            table += '</tbody></table>';

            return table;
        }
    );

    // --------------------------------------------------
    // PARAGRAPHS
    // --------------------------------------------------

    const blocks = html.split(/\n\s*\n/);

    html = blocks
        .map(block => {

            block = block.trim();

            if (!block) {
                return '';
            }

            // Don't wrap existing HTML blocks
            if (
                block.startsWith('<h1>') ||
                block.startsWith('<h2>') ||
                block.startsWith('<h3>') ||
                block.startsWith('<h4>') ||
                block.startsWith('<h5>') ||
                block.startsWith('<h6>') ||
                block.startsWith('<ul>') ||
                block.startsWith('<ol>') ||
                block.startsWith('<pre>') ||
                block.startsWith('<blockquote>') ||
                block.startsWith('<table>') ||
                block.startsWith('<hr>')
            ) {
                return block;
            }

            return `<p>${block}</p>`;
        })
        .join('\n');

    // --------------------------------------------------
    // SINGLE LINE BREAKS
    // --------------------------------------------------

    html = html.replace(
        /(?<!>)\n(?!<)/g,
        '<br>'
    );

    return html;
}


// ======================================================
// n8n INPUT / OUTPUT
// ======================================================

return $input.all().map(item => {

    const markdown = item.json.text || '';

    const html = markdownToHtml(markdown);

    return {
        json: {
            ...item.json,
            html: html
        }
    };

});