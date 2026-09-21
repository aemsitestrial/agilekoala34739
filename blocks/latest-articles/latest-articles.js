import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    const [label, category, title, link] = [...row.children];

    const hasContent =
      label?.textContent?.trim()
      || category?.textContent?.trim()
      || title?.textContent?.trim();

    if (!hasContent) {
      return;
    
    }
    const linkAnchor = link?.querySelector('a');
    const articleLink = linkAnchor?.href || link?.textContent?.trim() || '#';

    const a = document.createElement('a');
    a.href = articleLink;
    if (articleLink === '#') a.setAttribute('aria-disabled', 'true');
    moveInstrumentation(link, a);

    const meta = document.createElement('div');
    meta.className = 'article-meta';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'article-label';
    moveInstrumentation(label, labelSpan);
    labelSpan.textContent = label?.textContent || '';

    const categorySpan = document.createElement('span');
    categorySpan.className = 'article-category';
    moveInstrumentation(category, categorySpan);
    categorySpan.textContent = category?.textContent || '';

    meta.append(labelSpan, categorySpan);

    const content = document.createElement('div');
    content.className = 'article-content';

    const h3 = document.createElement('h3');
    moveInstrumentation(title, h3);
    h3.textContent = title?.textContent || '';

    const arrow = document.createElement('span');
    arrow.className = 'article-arrow';
    arrow.textContent = '→';

    content.append(h3, arrow);
    a.append(meta, content);
    li.append(a);

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
