var xhr = XMLHttpRequest();
xhr.open('PUT', 'https://api.typeform.com/forms/x7S73Q/webhooks/accounts', true);
xhr.setRequestHeader('Authorization','bearer {};');
xhr.setRequestHeader('Content-type','application/json;');
xhr.send();
