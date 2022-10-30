class User < ApplicationRecord
    has_many :memberships
    has_many :communities, :through => :memberships
    has_one :managed_community, class_name: "Community", foreign_key: "user_id"
end