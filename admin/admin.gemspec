$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "admin/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "admin"
  s.version     = Admin::VERSION
  s.authors     = ["Hor Norin"]
  s.email       = ["norin.hor@gmail.com"]
  s.homepage    = "http://admin.chahayo.net"
  s.summary     = "Chahayo Admin Section"
  s.description = "Chahayo Admin Section"
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]

  s.add_dependency "rails", "~> 4.2.6"

  s.add_development_dependency "mysql2"
end
