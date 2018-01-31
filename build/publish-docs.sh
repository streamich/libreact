mv storybook-static/ docs/_book/demos/
cd docs/_book
git init
git add -A
git commit -m 'update docs'
git push -f git@github.com:MailOnline/libreact.git master:gh-pages
