/*
 *  lib/query.js
 *
 *  David Janes
 *  IOTDB.org
 *  2019-04-26
 *
 *  Copyright (2013-2019-04-26
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

const _ = require("iotdb-helpers")

/**
 */
const query = (_query, _search) => _.promise(self => {
    _.promise.validate(self, query)

    const order_column_n = _.coerce.to.Integer(_.d.first(_query, "/order/column", 1), 1)
    const order_column = _.d.first((_query.columns || [])[order_column_n], "data") || _search
    const order_ascending = _.d.first(_query, "/order/dir", "asc") === "asc" ? true : false;

    self.query_sort = ( order_ascending ? "+" : "-" ) + order_column
    self.pager = _.coerce.to.Integer(_query.start)
    self.query_limit = _.coerce.to.Integer(_query.length)
    self.query = {}

    const query_search = _.d.first(_query, "/search/value") || null
    if (query_search) {
        sd.query[_search] = [ "find", query_search ]
    }
})

query.method = "query"
query.requires = {
}
query.produces = {
    page: _.is.Integer,
    query_limit: _.is.Integer,
    query_sort: _.is.Array,
    query_search: _.is.String,
}

/**
 *  API
 */
exports.query = query
