echo "$DOCKER_PASS" | docker login -u $DOCKER_USER --password-stdin
export REPO=isaiahsolo/personal-site-frontend
export TAG=`if [ "$TRAVIS_BRANCH" == "main" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
docker build -f Dockerfile -t $REPO:$COMMIT .
docker tag $REPO:$COMMIT $REPO:$TAG
docker tag $REPO:$COMMIT $REPO:travis-$TRAVIS_BUILD_NUMBER
docker push $REPO