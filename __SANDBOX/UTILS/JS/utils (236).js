const asyncHandler = (handler) => (req,res,next) => handler(req,res,next).catch(next);


const formatDate = date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    switch (month) {
        case 01:
            return `Jan ${day}, ${year}`;
        case 02:
            return `Feb ${day}, ${year}`;
        case 03:
            return `Mar ${day}, ${year}`;
        case 04:
            return `Apr ${day}, ${year}`;
        case 05:
            return `May ${day}, ${year}`;
        case 06:
            return `June ${day}, ${year}`;
        case 07:
            return `July ${day}, ${year}`;
        case 08:
            return `Aug ${day}, ${year}`;
        case 09:
            return `Sep ${day}, ${year}`;
        case 10:
            return `Oct ${day}, ${year}`;
        case 11:
            return `Nov ${day}, ${year}`;
        case 12:
            return `Dec ${day}, ${year}`;
    }
}

const determineReadTime = content => {
    const wordCount = content.split(' ').length;
    const minutes = Math.round(wordCount / 300);
    return `${minutes} min read`
}

const createTrendingStories = searchReturn => {
    return searchReturn.map(story => {
        return {
            id: story.id,
            title: story.title,
            authorId: story.User.id,
            authorName: `${story.User.firstName} ${story.User.lastName}`,
            authorAvatar: story.User.avatarUrl,
            date: formatDate(story.updatedAt),
            readTime: determineReadTime(story.content)
        }
    })
}


// clap already exists error handler
function clapAlreadyExistsError(id, type) {
    let error = new Error(`${type} with ID ${id} has already been clapped.`);
    error.title = "Clap already exists.";
    error.status = 400;
    return error;
}

module.exports = {
    asyncHandler,
    formatDate,
    determineReadTime,
    createTrendingStories,
    clapAlreadyExistsError,
}
