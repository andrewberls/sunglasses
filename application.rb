require 'sinatra'
require 'uri'
require 'net/http'
require 'json'
require 'open-uri'

# http://www.wunderground.com/weather/api/
API_KEY = 'b644d909363a0381'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

post '/sunglasses' do
  begin
    state = 'CA' # TODO
    city  = params[:city].split.map(&:capitalize).join('_')

    need = false
    icon = ""
    temp = -1

    open("http://api.wunderground.com/api/#{API_KEY}/conditions/q/#{state}/#{city}.json") do |f|
      json = JSON.parse(f.read)

      curr = json['current_observation']
      temp = curr['temp_f']
      icon = curr['icon'] # sunny, mostlysunny, partlysunny, partlycloudy, clear, etc

      need = %w(sunny mostlysunny partlysunny).include?(icon).to_s
      need = 'true'  if %w(clear).include?(icon) && temp.to_f > 60
      need = 'maybe' if %w(partlycloudy).include?(icon) && temp.to_f > 65
    end

    return { city: city, need: need, icon: icon, temp: temp }.to_json
  rescue
    # Something went wrong - probably can't find location
    return {}.to_json
  end
end
