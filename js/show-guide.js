document.addEventListener('DOMContentLoaded', () => {
  const guideBtn = document.querySelector('.show-guide');

  guideBtn.addEventListener('click', (e) => {
    const isActive = e.currentTarget.dataset.active === '1';

    if (!isActive) {
      e.currentTarget.dataset.active = '1';
      enableStyleGuide();
      guideBtn.textContent = 'Hide Structure Guide';
    }
    else {
      e.currentTarget.dataset.active = '0';
      disableStyleGuide();
      guideBtn.textContent = 'Show Structure Guide';
    }
  })

  function enableStyleGuide() {
    // Colors
    const guideColors = {
      section: 'yellow',
      container: 'red',
      row: 'white',
      cols: '#ae0cdc',
      colsContent: '#0d0d0d',
    }

    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      section, header, footer {
        border: 2px solid ${guideColors.section};
      }
      .container:not(.structure-guide-list) {
        outline: 1px solid ${guideColors.container};
      }
      .row {
        border: 2px solid ${guideColors.row};
      }
      .row > .col {
        border: 2px solid ${guideColors.cols};
      }
      .row > .col > * {
        border: 2px solid ${guideColors.colsContent};
      }
      .structure-guide-list {
        padding-top: 45px;
        padding-bottom: 45px;
        font-weight: 500;
      }
      .structure-guide-list ul {
        outline: none !important;
        list-style: none;
        padding: 0;
      }
      .structure-guide-list li + li {
        margin-top: 10px;
      }
      .structure-guide-list .color {
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    `;

    document.head.appendChild(styleEl);

    const legend = document.createElement('div');
    legend.classList.add('structure-guide-list', 'container');
    legend.innerHTML = `
      <ul>
        <li><span class="color" style="background-color: ${guideColors.section};"></span> <span style="display: inline-block;vertical-align:middle;">Sections/Blocks (Header and Footer included)</span></li>
        <li><span class="color" style="background-color: ${guideColors.container};"></span> <span style="display: inline-block; vertical-align: middle;">Containers</span></li>
        <li><span class="color" style="background-color: ${guideColors.row};"></span> <span style="display: inline-block; vertical-align: middle;">Rows</span></li>
        <li><span class="color" style="background-color: ${guideColors.cols};"></span> <span style="display: inline-block; vertical-align: middle;">Columns</span></li>
        <li><span class="color" style="background-color: ${guideColors.colsContent};"></span> <span style="display: inline-block; vertical-align: middle;">Column Content</span></li>
      </ul>
    `;

    document.body.prepend(legend);

    const header = document.querySelector('.header');
    let headerTop = getComputedStyle(header).top;
    headerTop = parseInt(headerTop.replace('px', ''));
    header.style.top = `${headerTop + legend.scrollHeight}px`;
  }

  function disableStyleGuide() {
    const styleEl = document.querySelector('style');
    styleEl.remove();

    const legend = document.querySelector('.structure-guide-list');
    legend.remove();

    const header = document.querySelector('.header');
    header.setAttribute('style', '');
  }
})