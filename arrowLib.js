/* 
*   @author: Rafael Bellotti 
*   @version: 1.2
*   @last_update: 19/09/2017 - 15:02
*   @changelog: Adicionado query de todos os usuários do Cloud
*/

var ArrowDB;

var initialize = function (arrowApiKey) {
    //ArrowDB = require('../modules/arrowdb-node-sdk/lib/arrowdb'),
    ArrowDB = require('../node_modules/arrowdb'),
        arrowDBApp = new ArrowDB(arrowApiKey);

};

//////////////////////// Custom Objects ////////////////////////

/*
* Params: options {classname, limit, skip, order, where}, callback function
*/
var queryCustomObjects = function (options, callback) {
    arrowDBApp.customObjectsQuery(options, function (error, result) {
        if (error) {
            console.error("SS query error :" + error.message);
        } else {
            callback(result.body.response[options.classname]);
        }
    });
};

var queryAllCustomObjects = function (options, allObjectsArray, callback) {

    arrowDBApp.customObjectsQuery(
    {
        classname: options.classname,
        where: options.where,
        limit: 1000,
    }, function (error, result) {
        if (error) {
            console.error("SS query error :" + error.message);
        } else {
            var objectList = result.body.response[options.classname];


            if (objectList.length == 0) {
                callback(allObjectsArray);
            }
            else {
                //allObjectsArray.push(objectList);
                allObjectsArray.push.apply(allObjectsArray, objectList);
                options.where._id = { "$lt": objectList[objectList.length - 1].id };

                queryAllCustomObjects(options, allObjectsArray, callback);
            }
        }
    });
};



var createCustomObject = function (options, callback) {
    arrowDBApp.customObjectsCreate(options, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        else {
            var createdObject = result.body.response[options.classname][0];
            console.log("Object " + createdObject.id + " created.");
            callback(createdObject);
        }
    });
};

var updateCustomObject = function (options, callback) {
    arrowDBApp.customObjectsUpdate(options, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        else {
            var updatedObject = result.body.response[options.classname][0];
            console.log("Object " + updatedObject.id + " updated.");
            callback(updatedObject);
        }
    });
};

var batchDeleteCustomObjects = function (options, callback) {
    arrowDBApp.customObjectsBatchDelete(options, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        else {
            console.log('Custom objects from classname ' + options.classname + ' with the specified "where" clause were deleted.');
            callback();
        }
    });
};


//////////////////////// Users ////////////////////////

var userLogin = function (credentials, callback) {
    arrowDBApp.usersLogin({
        login: credentials.login,
        password: credentials.password
    }, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        else {
            console.log("User logged in: " + credentials.login);
            arrowDBApp.sessionCookieString = result.cookieString;
            callback(result.body.response.users[0]);
        }
    });
};

var userQuery = function (options, callback) {
    arrowDBApp.usersQuery({
        where: options.where,
        limit: options.limit,
    }, function (err, result) {
        if (err) {
            console.error(err.message);
        } else {
            var usersObjectList = result.body.response.users;
            
            if(usersObjectList == 0)
            {
                callback(usersObjectList);
            }
            else
            {
                //console.log(JSON.stringify(usersObjectList));
                excelSheetInsert(users,usersObjectList);
                // console.log(usersObjectList.username + " " + usersObjectList.cust
                options.where._id = { "$lt": usersObjectList[usersObjectList.length - 1].id };
                userQuery(options, callback);
             }//inner else
        }//else
    });//usersQuery

};//userQuery

var queryAllUsers = function(options, userArray, callback)
{
    arrowDBApp.usersQuery(
    {
        where: options.where
    }, function (error, result) {
        if (error) 
        {
            console.error("User query error :" + error.message);
        } 
        else 
        {
            var response = result.body.response.users;

            if (response.length == 0) 
            {
                callback(userArray);
            }
            else 
            {
                userArray.push.apply(userArray, response);
                options.where._id = { "$lt": response[response.length - 1].id };

                queryAllUsers(options, userArray, callback);
            }
        }
    });
};

//////////////////////// Photos ////////////////////////

var photoQuery = function (fields, callback) {
    arrowDBApp.photosQuery(fields, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        else {
            callback(result.body.response.photos);
        }
    });
}

var photoUpdate = function (options, callback) {
    arrowDBApp.photosUpdate(options, function (error, result) {
        if (error) {
            console.error(error.message);
        }
        else {
            var updatedPhoto = result.body.response.photos[0];
            console.log("Photo " + updatedPhoto.id + " updated.");
            callback(updatedPhoto);
        }
    });
}

var updateAllPhotos = function (photoIds, custom_fields, i, allPhotos, callback) {

    arrowDBApp.photosUpdate({
        photo_id: photoIds[i],
        custom_fields: custom_fields
    }, function (error, result) {
            if (error) {
                console.error(error.message);
            }
            else 
            {
                var next = i + 1;

                var updatedPhoto = result.body.response.photos[0];
                console.log("Photo " + updatedPhoto.id + " updated.");
                allPhotos.push(updatedPhoto);

                if (next < photoIds.length) {
                    updateAllPhotos(photoIds, custom_fields, next, allPhotos, callback);
                }
                else {
                    callback(allPhotos);
                }

            }
        });

};

exports.initialize = initialize;

exports.queryCustomObjects = queryCustomObjects;
exports.queryAllCustomObjects = queryAllCustomObjects;
exports.createCustomObject = createCustomObject;
exports.updateCustomObject = updateCustomObject;
exports.batchDeleteCustomObjects = batchDeleteCustomObjects;

exports.userLogin = userLogin;
exports.userQuery = userQuery;
exports.queryAllUsers = queryAllUsers;

exports.photoQuery = photoQuery;
exports.photoUpdate = photoUpdate;
exports.updateAllPhotos = updateAllPhotos;