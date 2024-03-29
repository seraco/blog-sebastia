---
excerpt: My code review process
time_to_read: 2 mins
---

## Understanding the scope (approx. 30s)

I begin by quickly skimming through the description to understand the broader context and scope.

## Navigating through file changes

To reduce the visual clutter of file changes, I either collapse all changed files to gain a bird's-eye view (press <kbd>Alt</kbd> and click on the file caret) or use the file tree on the left sidebar to aid navigation.

![Pull Request example](/assets/images/pull-request.png)

(You can find a file caret left of number 31 in `.travis.yml`.)

## Prioritising simple changes

To manage cognitive load, I prioritise simple changes that can be addressed swiftly (typically less than a minute per change). This enables me to mark most files as reviewed, focusing my full attention on more complex modifications.

## Continuing with unit tests

For complex modifications, particularly those impacting critical logic, I find it useful to start reviewing unit tests. Tests can usually be quite descriptive and allow me to better understand the intended functionality.

## Focusing on detailed review

I leave the changes that need my best attention to detail for the end.

## Active engagement: leaving comments

Throughout the review, when I find anything I don't understand I leave a comment. The comments serve as markers of unresolved queries that can later be addressed.

## Completion and iteration

I mark files as reviewed only when I'm fully satisfied with the changes. Once I've marked all files, the review is complete.

As the author introduces new changes, I focus on reviewing only the modified files or individual commits to optimise efficiency.
