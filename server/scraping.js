import cheerio from 'cheerio';

const videos = new Set();

const sleep = seconds =>
    new Promise(resolve => setTimeout(resolve, (seconds || 1) * 1000));

export const scrape_info = async(browser) => {

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('https://www.youtube.com/feed/trending');

    try {
        await page.waitForSelector('input[id="search"]', { timeout: 5000 });
    } catch (e) {
        return results;
    }

    const results = {};

    await page.waitForSelector('ytd-video-renderer,ytd-grid-video-renderer', { timeout: 10000 });
    let html = await page.content();
    results['__frontpage__'] = parse(html);

    // for (var i = 0; i < keywords.length; i++) {

    //     keyword = keywords[i];

    //     try {
    //         const input = await page.$('input[id="search"]');
            
    //         await input.click({ clickCount: 3 });
    //         await input.type(keyword);
    //         await input.focus();
    //         await page.keyboard.press("Enter");

    //         await page.waitForFunction(`document.title.indexOf('${keyword}') !== -1`, { timeout: 5000 });
    //         await page.waitForSelector('ytd-video-renderer,ytd-grid-video-renderer', { timeout: 5000 });
    //         await sleep(1);

    //         let html = await page.content();
    //         results[keyword] = parse(html);

    //     } catch (e) {
    //         console.error(`Problem with scraping ${keyword}: ${e}`);
    //     }
    // }
    return results;
}

const parse = (html) => {
    const $ = cheerio.load(html);

    const results = [];
    console.log($('#contents ytd-video-renderer,#contents ytd-grid-video-renderer')[0]);
    // $('#contents ytd-video-renderer,#contents ytd-grid-video-renderer').each((i, link) => {
    //     console.log("link =>", link)
    //     results.push({
    //         link: $(link).find('#video-title').attr('href'),
    //         title: $(link).find('#video-title').text(),
    //         snippet: $(link).find('#description-text').text(),
    //         channel: $(link).find('#byline a').text(),
    //         channel_link: $(link).find('#byline a').attr('href'),
    //         num_views: $(link).find('#metadata-line span:nth-child(1)').text(),
    //         release_date: $(link).find('#metadata-line span:nth-child(2)').text(),
    //     })
    // });

    // const cleaned = [];
    // for (var i=0; i < results.length; i++) {
    //     let res = results[i];
    //     if (res.link && res.link.trim() && res.title && res.title.trim()) {
    //         res.title = res.title.trim();
    //         res.snippet = res.snippet.trim();
    //         res.rank = i+1;

    //         if (videos.has(res.title) === false) {
    //             cleaned.push(res);
    //         }
    //         videos.add(res.title);
    //     }
    // }

    // return {
    //     time: (new Date()).toUTCString(),
    //     results: cleaned,
    // }
}