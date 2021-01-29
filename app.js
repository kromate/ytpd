const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
let port = process.env.PORT || 3000

app.use(cors());

app.listen(port, () => {
    console.log(`Server Works !!! At port ${port}`);
});

app.get('/download', async (req,res) => {
    try {
       
        let url = req.query.url;
        console.log(url);
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title = 'video';

		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
            title = info.player_response.videoDetails.title.replace(/[^\x00-\x7F]/g, "");
            console.log(title);
        });
        

		res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
		ytdl(url, {
			format: 'mp4',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
})
