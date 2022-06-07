class AttrAccessorObject
  def self.my_attr_accessor(*names)
    define_method()
  end

  def self.my_attr_accessor(*methods)
    methods.each do |method|
      # define_method(method) do
      #   @method = method

      self.class_eval("def #{method}; @#{method}; end")
      self.class_eval("def #{method}=(val); @#{method}=val; end")
    
    end
  
  end
  my_attr_accessor :what, :is, :happening
end

