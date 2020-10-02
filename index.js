const puppeteer = require('puppeteer');

const GetItems = async (searchTerm ) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();

    await page.goto(
        `https://www.jumia.co.ke/catalog/?q=${encodeURI(searchTerm)}`
        );


    const itemList = await page.waitForSelector(
        'div >section> div > article >a.core'
    ).then(()=>
     page.evaluate(() => {
        const itemArray =[];
        const itemNodeList = document.querySelectorAll('div >section> div > article >a');

        //console.log(itemNodeList)
        // to iterate thourgh nonelist
        itemNodeList.forEach(item => {
            const itemTitle= item.getAttribute("data-name")
            //console.log(itemTitle)
            const itemPrice = item.querySelector(" div.info > div.prc").innerHTML
            //console.log(itemPrice)
            const itemURL = `https://www.jumia.co.ke${item.getAttribute('href')}`;
            //console.log(itemURL);
            const itemImg = item.querySelector('div > img').getAttribute('data-src')
            //console.log(itemImg)

            //push info into array
            itemArray.push({ itemTitle, itemPrice, itemURL, itemImg })
        });
        //console.log(itemArray);
        return itemArray;
    })
    )
    //page.evaluate allows us to get browser content
    .catch(() => console.log('selector error'));

    console.log(itemList)
    // instead of loggin this info lets return it
    return itemList;
};
GetItems('iphone 10');