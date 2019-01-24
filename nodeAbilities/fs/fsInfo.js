/*
POSIX method | fs method | Description
rename(2) | fs.rename | Changes the name of a file
truncate(2) | fs.truncate | Truncates or extends a file to a specified length
ftruncate(2) | fs.ftruncate | Same as truncate but takes a file descriptor
chown(2) | fs.chown | Changes file owner and group
fchown(2) | fs.fchown | Same as chown but takes a file descriptor
lchown(2) | fs.lchown | Same as chown but doesn’t follow symbolic links
chmod(2) | fs.chmod | Changes file permissions
fchmod(2) | fs.fchmod | Same as chmod but takes a file descriptor
lchmod(2) | fs.lchmod | Same as chmod but doesn’t follow symbolic links
stat(2) | fs.stat | Gets file status
lstat(2) | fs.lstat | Same as stat but returns information about link if
provided rather than what the link points to
fstat(2) | fs.fstat | Same as stat but takes a file descriptor
link(2) | fs.link | Makes a hard file link
symlink(2) | fs.symlink | Makes a symbolic link to a file
readlink(2) | fs.readlink | Reads value of a symbolic link
realpath(2) | fs.realpath | Returns the canonicalized absolute pathname
unlink(2) | fs.unlink | Removes directory entry
rmdir(2) | fs.rmdir | Removes directory
mkdir(2) | fs.mkdir | Makes directory
readdir(2) | fs.readdir | Reads contents of a directory
close(2) | fs.close | Deletes a file descriptor
open(2) | fs.open | Opens or creates a file for reading or writing
utimes(2) | fs.utimes | Sets file access and modification times
futimes(2) | fs.futimes | Same as utimes but takes a file descriptor
fsync(2) | fs.fsync | Synchronizes file data with disk
write(2) | fs.write | Writes data to a file
read(2) | fs.read | Reads data from a file

File descriptors (FDs) are integers (indexes) associated with open files within a process
managed by the operating system. As a process opens files, the operating system keeps
track of these open files by assigning each a unique integer that it can then use to look
up more information about the file.

Some reserved fd's:
stdin 0 Standard input
stdout 1 Standard output
stderr 2 Standard error
fs.writeSync(1, 'Logging to stdout')
*/