// This should be executed in the browser's console (REPL ftw)


let arrPictureElements = document.getElementsByClassName('rg_ic');
let arrSources = [];

for(let element of arrPictureElements)
{
    arrSources.push(element.src);
}

// write the URls to file (one per line)
let textToSave = arrSources.join('\n');
let hiddenElement = document.createElement('a');
hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
hiddenElement.target = '_blank';
hiddenElement.download = 'urls.txt';
hiddenElement.click();