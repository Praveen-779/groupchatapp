const AWS = require('aws-sdk');
const MultiMedia = require('../models/multimedia');

exports.sendFile = async (req, res, next) => {
  try {
    const file = req.file;

    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    const s3 = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET

    })
    const params = {
      Bucket: BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer,
      ACL: 'public-read' 
    };
    const uploadedFile = await s3.upload(params).promise();

    const fileUrl = uploadedFile.Location;
    console.log(fileUrl);

    res.status(200).json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.postUrl = async (req, res, next) => {

  try {
    const url = req.body.url;
    const groupId = req.params.groupId;
    const userId = req.user.id;
    if (!url && !groupId && !userId) {
      return res.status(400).json({ message: 'something went wrong' })
    }
    const response = await MultiMedia.create({
      url: url,
      username: req.user.name,
      groupId: groupId,
      userId: userId
    })
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
  }
}

exports.getFile = async (req, res, next) => {
  try {
    const groupId = req.params.groupId;

    const multimedia = await MultiMedia.findAll({where : {
      groupId : groupId
    }})
    console.log('inside get media');
    return res.status(200).json({multimedia});
  } catch(err) {
    console.log(err);
    return res.status(500).json({err});
  }
  
}