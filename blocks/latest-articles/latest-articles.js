export default function decorate(block) {
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    const [label, category, title, link] = [...row.children];

    const articleLink = link?.textContent?.trim() || '#';

    li.innerHTML = `
      ${articleLink}
        <div class="article-meta">
          <span class="article-label">${label?.textContent || ''}</span>
          <span class="article-category">${category?.textContent || ''}</span>
        </div>
        <div class="article-content">
          <h3>${title?.textContent || ''}</h3>
          <span class="article-arrow">→</span>
        </div>
      </a>
    `;

    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}