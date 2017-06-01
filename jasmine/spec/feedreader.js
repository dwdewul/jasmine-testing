/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('feeds are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('feed url is defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
         });


        /* in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('feed name is defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }); 
         });
    });

    describe('The menu', function() {
        var menu = $('.menu-hidden');
        var menuIcon = $('a.menu-icon-link');
        
        it('hidden menu', function () {
            expect(menu.is(':visible')).toBe(true);
        });

        /* visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu visible on click', function () {
            menuIcon.click();
            expect($('.menu-hidden').is(':visible')).toBe(false);
        });

        it('hidden by clicking again ', function () {
            menuIcon.click();
            expect($('.menu-hidden').is(':visible')).toBe(true);
        });
    });
    
    describe('Initial Entries', function(){
        
        /* function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var feedContent; 
        
        // make sure to loadFeed() then make sure that the array of elements is not empty
        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
                }
            );
        });

        it('check for feed content', function(){
            feedContent = $('.feed .entry');
            expect(feedContent.length).toBeGreaterThan(0);
        });
    });
    
    describe('New Feed Selection', function(){

        /* by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous. */
        var feedContent;
        
        // loadFeed() and set the feedContent to the value of what was loaded at index 0
        // then loadFeed for the 2nd index and complete
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedContent = $('.feed').html();
                loadFeed(1, function() {
                    done();
                });
            });
        });
        
        // since the loaded content was appended, make sure that the original html is 
        // not equal, which means nothing was added
        
        it('has been loaded', function(){
            expect($('.feed').html()).not.toBe(feedContent);
        });
    });
}());
