class Community < ApplicationRecord
    has_many :memberships
    has_many :users, :through => :memberships
    belongs_to :community_manager, class_name: "User", foreign_key: "user_id"
    has_many :campaigns
end