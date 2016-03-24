require "api/engine"

module Api
end

Kernel.const_set('ExtEngine', Api::Engine)
