# Essa função serve para capturar as estatisticas do user, as estatisticas de linguagens utilizadas
# Rode primeiro esse arquivo, e depois chame a função no arquivo de javascript

import requests
import json

# Substitua 'USERNAME' pelo nome do usuário do GitHub
username = 'USERNAME'
token = 'TOKEN'  # Coloque o novo token de acesso pessoal aqui

def get_repos(username, token):
    url = f'https://api.github.com/users/@USER/repos'
    headers = {'Authorization': f'token @TOKEN'}
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Isso levantará uma exceção se a resposta não for 200 OK
    return response.json()

def get_languages(repos):
    languages = {}
    for repo in repos:
        repo_name = repo['name']
        lang_url = repo['languages_url']
        response = requests.get(lang_url, headers={'Authorization': f'token  @TOKEN'})
        response.raise_for_status()
        repo_languages = response.json()
        for lang, bytes in repo_languages.items():
            if lang in languages:
                languages[lang] += bytes
            else:
                languages[lang] = bytes
    return languages

# Fetch and process data
repos = get_repos(username, token)
languages = get_languages(repos)

# Save data to a file
with open('languages.json', 'w') as f:
    json.dump(languages, f, indent=4)
