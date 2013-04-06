# Will I Need Sunglasses?

There's nothing I hate more than leaving my house without sunglasses on a cloudy day, only to be blinded by the sun's deceitful rays an hour later.
This app aims to fix that problem once and for all! You tell the app where you are, and it will determine once and for all whether or not you'll need sunglasses for the day.

## Technical details
The frontend uses a bit of JavaScript/[jQuery](http://jquery.com/), which submits data to a backend running [Sinatra](http://www.sinatrarb.com/).

The Sinatra app in turns call out to the  weather API at [http://www.wunderground.com/weather/api/](http://www.wunderground.com/weather/api/) - you can create an account and get your own API key for free.

To get a copy running locally, you'll need to clone the repository, install dependencies, and start the server.

```
git clone https://github.com/andrewberls/sunglasses.git
cd sunglasses
bundle install
rackup config.ru
```

If everything went correctly, you should have a copy up and running at [localhost:9292](http://localhost:9292)!
  
This is a micro-project for [ACM @ UCSB](http://acmucsb.com/).
