
const puppeteer = require('puppeteer');
var the_links = [];
var counter = 0;
var max =10;



async function run (page_link) {

  if(counter <= max){
    //console.log(items[index]);
      //  index++;
        //await sleep(seconds);
        //run(index);




  console.log(counter);


    const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
    //console.log(await browser.version());
    const page = await browser.newPage();
    await page.goto(page_link);
   //   await page.screenshot({path: 'antiwar.png', fullPage: true});
   const html = await page.content();
    // const title = await page.evaluate(()=> document.title );
    // console.log(title);
    //const text = await page.evaluate(() => document.body.innerText);
    const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
    for( x in links)
    {

        // console.log(links[x])
        // console.log(the_links)
        the_links= the_links.concat(links[x]);
        //console.log(the_links)
        counter ++;
        run(links[x]);

    }
  await browser.close();

}
}



run('https://antiwar.com');

console.log(the_links);
