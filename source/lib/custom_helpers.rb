module CustomHelpers
  def magic_link_to(*args, &block)
    raise  current_resource.path.inspect
    if current_resource.path == args[0]
      args[1][:class] = "current"
      raise args[1][:class]
    end
    link_to(*args, &block)
  end

  def current(link)
    if link == request.path
      "current"
    end
  end
end
