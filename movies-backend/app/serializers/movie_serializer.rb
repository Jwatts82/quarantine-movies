class MovieSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :watched
end
