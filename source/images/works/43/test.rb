#File.rename(f, folder_path + "/" + filename.capitalize + File.extname(f))

puts "Renaming files..."

folder_path = Dir.pwd + "/1/"
puts folder_path
Dir.glob(folder_path + "*").sort.each do |f|
  filename = File.basename(f, File.extname(f))
  names = filename.scan(/(.+)_(\d{1,3})/)[0]
  x = (names[1].to_i - 1)/10
  y =  (names[1].to_i - 1) % 10
  File.rename(f, folder_path + names[0] + "_" + x.to_s + "_" + y.to_s + File.extname(f))
end

puts "Renaming complete."
