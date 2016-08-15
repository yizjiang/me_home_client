require 'yaml'

namespace :region do
  desc 'import xls from file'
  task :import do
    city = CSV.read("./config/city_price.csv")
    data = {}
    city[1..-1].each do |ex|
      data.merge! Hash[ex[2], {'price' => ex[3].delete(','), 'label' => ex[1]}]
    end

    File.open('./config/price_for_region.yml', 'w') {|f| f.write data.to_yaml }
  end
end
