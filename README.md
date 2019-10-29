# Songbonds

This app has been developed as my final project at the [neue Fische](https://www.neuefische.de/weiterbildung/web-development "neue fische web-development") web developer bootcamp.
It is an app for musicians to organize their different files and data for their songs. They can bundle texts, images and audio-files for each song. 


## Preview

<p>
<img src="https://res.cloudinary.com/songbonds/image/upload/v1572295456/GitHub-Pics/q0d1a9s8kbmd2bopvw2r.png" width="200">
<img src="https://res.cloudinary.com/songbonds/image/upload/v1572295457/GitHub-Pics/wec06tsxkkwia0vjiwtt.png" width="200">
<img src="https://res.cloudinary.com/songbonds/image/upload/v1572295462/GitHub-Pics/kcev0bn8cnyxwcp715ld.png" width="200">
</p>

## Tech stack

   * **M**ongoDB
   * **E**xpress.js
   * **R**eact
   * **N**ode.js
   
### Additional dependencies:

  * axios
  * bcrypt
  * cors
  * mongoose
  * nodemon
  * prop-types
  * react-h5-audio-player
  * react-router-dom
  * styled-components
  * styled-icons

## Setup

git@github.com:lxrp/songbonds.git

```
cd songbonds
npm install
```


## Requirements

### MongoDB

You will need a Songbonds database with the collections **songs, users and usersessions** in your MongoDB running on localhost:27017.

### Cloudinary

* Create an account on https://cloudinary.com/.
* Go to https://cloudinary.com/console/settings/upload#upload_presets
* Click Enable unsigned uploading
* Copy the preset name (the 8 character hash below name)
* Create a .env.local file in the root directory of this project and add your cloudname and preset:

```
REACT_APP_CLOUDINARY_CLOUDNAME='your_cloudname'
REACT_APP_CLOUDINARY_PRESET='your_preset'
```


**Run the app in the development mode with:**
```
npm start
```
