
const puppeteer = require('puppeteer');
const { PendingXHR } = require('pending-xhr-puppeteer');
jest.setTimeout(30000);

test('load repositories', async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');

  // Input the user name.
  await page.click('input#username');
  await page.type('input#username', 'travis-ci');
  await page.click("button[type='submit'");

  // Wait for XHR to load.
  const pageXHR = await browser.newPage();
  const pendingXHR = new PendingXHR(pageXHR);
  await pageXHR.goto(`https://api.github.com/users/travis-ci/repos`);
  await pendingXHR.waitForAllXhrFinished();

  // Get first repository name.
  await page.waitForSelector('.repos_name');
  const repository = await page.evaluate(() => { return document.querySelector('.repos_name').innerHTML });
  await expect(repository).toEqual('2fabot')

  // Load branches.
  await page.click('.repos_name');
  await pageXHR.goto(`https://api.github.com/repos/travis-ci/2fabot/branches`);
  await pendingXHR.waitForAllXhrFinished();

  // Get first branch of first repository.
  await page.waitForSelector('.repos_branches.open');
  const branch = await page.evaluate(() => { return document.querySelector('.repos_branches.open span').innerHTML });
  await expect(branch).toEqual('master')


})


