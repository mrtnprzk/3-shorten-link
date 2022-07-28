import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/api/links';
import { WebApp } from "meteor/webapp";
import ConnectRoute from "connect-route";

Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  Meteor.publish('links', function() {
    return Links.find({});
  })
});

//executed whenever a user visits with a route like //localhost:3000/asdas
function onRoute(req, res, next) {
  //Take token out of the url and try to find a matching link in the Links collection
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    //If we find a link object, redirect the user to the long URL
    Links.update(link, { $inc: { clicks: 1 } });
    res.writeHead(307, {"Location": link.url});
    res.end();

  } else {
    //if we dont't find a link object, send the user to our normal React App
    next();
  }
}

const middleware = ConnectRoute(function(router) {
  router.get("/:token", onRoute);
})

WebApp.connectHandlers.use(middleware);