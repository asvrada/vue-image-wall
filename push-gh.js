const ghpages = require('gh-pages');
const fs = require('fs-extra');

const dir_page = 'gh-pages';

try {
    // Clear distination folder
    fs.removeSync(dir_page);

    // Copy
    fs.copySync('dist', dir_page);

    ghpages.publish(dir_page, function(err) {
        console.log(err);
    });
} catch (err) {
    console.error(err);
}