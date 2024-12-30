document.getElementById('capitalize').addEventListener('click', () => transformText('capitalize'));
document.getElementById('decapitalize').addEventListener('click', () => transformText('decapitalize'));

// Handle the text transformation
function transformText(action) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: (action) => {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const selectedText = selection.toString();
            let transformedText = '';
            if (action === 'capitalize') {
              transformedText = selectedText.toUpperCase();
            } else if (action === 'decapitalize') {
              transformedText = selectedText.toLowerCase();
            }
            document.execCommand('insertText', false, transformedText);
            return `Text ${action}d.`;
          } else {
            return 'No text selected.';
          }
        },
        args: [action],
      },
      (results) => {
        const feedback = results[0].result;
        document.getElementById('feedback').innerText = feedback;
      }
    );
  });
}