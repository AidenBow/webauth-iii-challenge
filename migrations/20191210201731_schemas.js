
exports.up = function(knex) {
  return (
    knex.schema
      .createTable("users", table => {
        table.increments("ID")
        table.string("username", 32).notNullable()
        table.string("password", 64).notNullable()
        table.string("department", 64)
      })
  )
};

exports.down = function(knex) {
  return (
    knex.shema
      .dropTableIfExists("users")
  );
};
