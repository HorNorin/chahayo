require "admin/engine"

module Admin
end

Kernel.const_set('ExtEngine', Admin::Engine)
