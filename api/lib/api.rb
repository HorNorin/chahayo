require "api/engine"

module Api
end

def base_class_path(current_path)
  current_path.sub(Api::Engine.root.to_s, Rails.root.to_s)
end

Kernel.const_set('ExtEngine', Api::Engine)
