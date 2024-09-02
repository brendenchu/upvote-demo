import { test, expect } from '@playwright/test';

test('click button of upvote list', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // get the first upvote list div
  const upvoteList = await page.$('.upvote-list');

  // expect the upvote list to exist
  expect(upvoteList).not.toBeNull();

  // expect the upvote list to have at least no list items
  expect(await upvoteList?.$$('li')).toHaveLength(0);

  // find the button element and click it
  const button = await upvoteList?.$('button');
  await button?.click();

  // expect the list to have 1 list item
  expect(await upvoteList?.$$('li')).toHaveLength(1);

  // get the svg element
  const svg1 = await upvoteList?.$('li svg');

  // expect the svg1 class name to contain 'selected'
  expect(await svg1?.getAttribute('class')).toContain('selected');

  // click the button again
  await button?.click();

  // expect the list to have 2 list items
  expect(await upvoteList?.$$('li')).toHaveLength(2);

  // expect the svg1 class name not to contain 'selected'
  expect(await svg1?.getAttribute('class')).not.toContain('selected');

  // get the second svg element
  const svg2 = await upvoteList?.$('li:nth-child(2) svg');

  // expect the svg2 class name to contain 'selected'
  expect(await svg2?.getAttribute('class')).toContain('selected');

});
