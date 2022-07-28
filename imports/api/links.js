import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';
import validUrl from "valid-url";

Meteor.methods({
    'links.insert': (url) => {
        check(url, Match.Where(url => validUrl.isUri(url)));

        //We are ready to save URL
        const token = Math.random().toString(36).slice(-5);
        // Links.insert({ url: url, token: token, clicks: 0 })
        Links.insert({ url, token, clicks: 0 }) //url and token same as up bc es6
    }
});

export const Links = new Mongo.Collection('links');