require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns

    # return @columns if @columns
    @columns ||= DBConnection.execute2(<<-SQL).first
    SELECT *
    FROM #{self.table_name}
    SQL
    @columns = @columns.map! { |key| key.to_sym }
  end

  def self.finalize!
  
    # self.columns.each do |col|
    #   self.class_eval("def #{col}; @#{col}; end")
    #   self.class_eval("def #{col}=(val); @#{col}=val; end")
    # end

    self.columns.each do |col|

      define_method(col) do
        self.attributes[col]
      end

      define_method("#{col}=") do |val|
        self.attributes[col] = val
      end

    end

  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    # self.to_s.downcase.split(" ").join("_") + 's'
    @table_name || self.name.tableize #.name always returns string of name
  end

  def self.all
    columns = DBConnection.execute(<<-SQL)
    SELECT *
    FROM #{self.table_name}
    SQL
    parse_all(columns)
  end

  def self.parse_all(results)
    parsed_results = []

    results.each do |result|
      parsed_results << self.new(result)
    end

    parsed_results
  end

  def self.find(id)
    results = DBConnection.execute(<<-SQL, id).first
    SELECT *
    FROM #{table_name}
    WHERE #{table_name}.id = ? 
    SQL
    self.parse_all(results)

  end

  def initialize(params = {})
    
    params.each do |key, val|
      if !self.class.columns.include?(key)
        raise "unknown attribute '#{key}'"
      else
        self.send("#{key}=", val)
      end
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    # ...
  end

  def insert
    # ...
  end

  def update
    # ...
  end

  def save
    # ...
  end
end
