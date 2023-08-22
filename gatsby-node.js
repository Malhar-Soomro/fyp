// Implement Gatsby API 'onCreagePage'. This is called after every page is created.

// exports.onCreatePage = async ({ page, actions }) => {
//     const { createPage } = actions;

//     // page.matchPage is a special key that's used for matching pages only on the client
//     if (page.path.match(/^\/dashboard/)) {
//         const pageConfig = { ...page, matchPath: '/dashboard/*' };

//         // update the page
//         createPage(pageConfig);
//     }
// }