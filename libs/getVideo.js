import { Innertube, UniversalCache } from "youtubei.js";

const yt = await Innertube.create({
  // required if you wish to use OAuth#cacheCredentials
  cache: new UniversalCache(false),
});

const getVideo = async (url) => {
  try {
    // Attempt to sign in
    await yt.session.signIn({
      access_token:
        "ya29.a0AcM612xj49NI2CxORFGOgS9nSp_aRP6CS0Q5ncwmqJjQZIOZnQfpNawKfv-TocEOjgnsKDqUFQibq3sLwPjmfy3mJjQ9FV66_stHUGrrzY4h6tkyIICHE0-0xvkWqDm5lmPnEKTKii5PysJhLdX8HyRutYNehpuwpA4YDotGwQE_I1qGLw3_aCgYKAX0SARMSFQHGX2MirxcCQDEX8_770dx7WNXjrw0187",
      refresh_token:
        "1//03p6akt_sMfmfCgYIARAAGAMSNwF-L9IrIdgVnOqsG6JapJXyTWLZa0YQuLFjPdWnYN8PPYFnH4pPoJ9IhfHX3K8SDu1bB4hDVmw",
      scope:
        "https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube-paid-content",
      expiry_date: " 2024-08-18T11:55:16.316Z",
    });

    // ... do something after sign in

    // You may cache the session for later use
    // If you use this, the next call to signIn won't fire 'auth-pending' instead just 'auth'.
    await yt.session.oauth.cacheCredentials();
    const videoInfo = await yt.getInfo(url, "WEB");
    // console.log(info.basic_info);
    const video = {
      title: videoInfo.basic_info.title,
      thumbnails: videoInfo.basic_info.thumbnail,
      uploadDate: videoInfo.primary_info.relative_date.text,
      duration: videoInfo.basic_info.duration,
      channel: videoInfo.basic_info.author,
      watchingCount: videoInfo.primary_info.view_count.text,
      channelThumbnails:
        videoInfo.secondary_info.owner.author.thumbnails[0].url,
      viewCount: videoInfo.primary_info.view_count.text,
      id: videoInfo.basic_info.id,
    };
    console.log(video);
    return { video };
  } catch (error) {
    console.log("error:", error);
  }
};
export default getVideo;
