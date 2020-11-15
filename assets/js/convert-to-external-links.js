function convertToExternalLinks() {
  const linksToConsider = document.body.querySelectorAll('.ext-link');

  for (let link of linksToConsider) {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  }
}

window.onload = convertToExternalLinks;
