'use strict';

function responsePacker() {
  return (req, res, next) => {
    res.pack = function packResponse(data, { status } = {}) {
      const response = {
        error: null,
        data: null,
      };

      if (data) {
        response.data = data;
      }

      if (status) {
        res.status(status);
      }

      return res.json(response);
    };

    res.pack.created = () => res.pack(null, { status: 201 });

    return next();
  };
}

exports.responsePacker = responsePacker;
