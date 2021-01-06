class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :watched
  belongs_to :category
end
