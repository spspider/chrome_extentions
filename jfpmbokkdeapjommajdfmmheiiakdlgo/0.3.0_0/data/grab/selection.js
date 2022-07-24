{
  const selection = window.getSelection();
  const rLinks = [];
  const div = document.createElement('div');

  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i);
    const f = range.cloneContents();
    div.appendChild(f);

    const n = range.commonAncestorContainer;
    if (n.nodeType === Node.ELEMENT_NODE) {
      rLinks.push(n.href);
    }
    else {
      rLinks.push(n.parentNode.href);
    }
  }
  // do not add ;
  [
    ...[...div.querySelectorAll('a')].map(a => a.href),
    ...rLinks,
    ...window.extraLinks
  ]
}
