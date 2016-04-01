$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "api/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "api"
  s.version     = Api::VERSION
  s.authors     = ["Hor Norin"]
  s.email       = ["norin.hor@gmail.com"]
  s.homepage    = "http://api.chahayo.net"
  s.summary     = "Chahayo API Service"
  s.description = "Chahayo API Service"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.2.6"
  s.add_dependency "active_model_serializers", "~> 0.8.3"

  s.add_development_dependency "mysql2"
end
