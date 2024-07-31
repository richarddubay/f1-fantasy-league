# 2. Use Express and Nodemon for the Server

Date: 2024-07-22

## Status

Accepted

## Context

We needed to have a server solution for this training application.

## Decision

Because it is what we're being trained to use, we decided on implementing Express for our API server. We also are using Nodemon for automatically restarting the server when changes are made.

## Consequences

It becomes easier to develop our API when we use Nodemon because we don't have to continually start and stop our server ... it's just always running. Express has a ton of support, is flexible to our needs, and should perform well under any load.
