import Foundation
import AVFoundation
import AppKit
import CoreVideo

struct Segment: Codable { let title:String;let subtitle:String;let image:String;let narration:String }
let cwd=URL(fileURLWithPath:FileManager.default.currentDirectoryPath)
let segments=try JSONDecoder().decode([Segment].self,from:Data(contentsOf:cwd.appendingPathComponent("docs/demo-storyboard.json")))
let tmp=URL(fileURLWithPath:"/tmp/catalyst-walkthrough")
try FileManager.default.createDirectory(at:tmp,withIntermediateDirectories:true)
var audioAssets:[AVURLAsset]=[]
var durations:[Double]=[]
for (i,segment) in segments.enumerated(){
 let text=tmp.appendingPathComponent("part-\(i).txt");try segment.narration.write(to:text,atomically:true,encoding:.utf8)
 let audio=tmp.appendingPathComponent("part-\(i).aiff")
 let process=Process();process.executableURL=URL(fileURLWithPath:"/usr/bin/say");process.arguments=["-v","Samantha","-r","175","-o",audio.path,"-f",text.path];try process.run();process.waitUntilExit()
 guard process.terminationStatus==0 else {fatalError("Speech generation failed")}
 let asset=AVURLAsset(url:audio);let seconds=CMTimeGetSeconds(asset.duration);guard seconds.isFinite && seconds>1 else {throw NSError(domain:"CatalystMedia",code:1,userInfo:[NSLocalizedDescriptionKey:"Speech export is unavailable in this restricted execution environment. Record the live demo with docs/demo-script.md, or run this optional helper in a local environment with media access."])};audioAssets.append(asset);durations.append(seconds+1.2)
}
let total=durations.reduce(0,+);print("Narration duration: \(total) seconds")
let videoURL=tmp.appendingPathComponent("silent.mov");try? FileManager.default.removeItem(at:videoURL)
let writer=try AVAssetWriter(outputURL:videoURL,fileType:.mov)
let width=1920,height=1080
let input=AVAssetWriterInput(mediaType:.video,outputSettings:[AVVideoCodecKey:AVVideoCodecType.h264,AVVideoWidthKey:width,AVVideoHeightKey:height,AVVideoCompressionPropertiesKey:[AVVideoAverageBitRateKey:2_500_000]])
input.expectsMediaDataInRealTime=false
let adaptor=AVAssetWriterInputPixelBufferAdaptor(assetWriterInput:input,sourcePixelBufferAttributes:[kCVPixelBufferPixelFormatTypeKey as String:kCVPixelFormatType_32ARGB,kCVPixelBufferWidthKey as String:width,kCVPixelBufferHeightKey as String:height,kCVPixelBufferCGImageCompatibilityKey as String:true,kCVPixelBufferCGBitmapContextCompatibilityKey as String:true])
writer.add(input);guard writer.startWriting() else {throw writer.error ?? NSError(domain:"CatalystMedia",code:2,userInfo:[NSLocalizedDescriptionKey:"Video encoding is unavailable in this execution environment."])};writer.startSession(atSourceTime:.zero)
func text(_ value:String,_ rect:CGRect,_ font:NSFont,_ color:NSColor){let style=NSMutableParagraphStyle();style.lineSpacing=7;let attrs:[NSAttributedString.Key:Any]=[.font:font,.foregroundColor:color,.paragraphStyle:style];(value as NSString).draw(in:rect,withAttributes:attrs)}
var start:Double=0
for (i,segment) in segments.enumerated(){
 let screenshot=NSImage(contentsOf:cwd.appendingPathComponent("static/research/"+segment.image))!
 let count=Int(ceil(durations[i]*2))
 for frame in 0..<count {
  while !input.isReadyForMoreMediaData {Thread.sleep(forTimeInterval:0.005)}
  autoreleasepool {
   var optional:CVPixelBuffer?;CVPixelBufferPoolCreatePixelBuffer(nil,adaptor.pixelBufferPool!,&optional);let pixel=optional!
   CVPixelBufferLockBaseAddress(pixel,[])
   let context=CGContext(data:CVPixelBufferGetBaseAddress(pixel),width:width,height:height,bitsPerComponent:8,bytesPerRow:CVPixelBufferGetBytesPerRow(pixel),space:CGColorSpaceCreateDeviceRGB(),bitmapInfo:CGImageAlphaInfo.noneSkipFirst.rawValue)!
   let graphics=NSGraphicsContext(cgContext:context,flipped:false);NSGraphicsContext.saveGraphicsState();NSGraphicsContext.current=graphics
   NSColor(srgbRed:0.078,green:0.149,blue:0.204,alpha:1).setFill();NSBezierPath(rect:CGRect(x:0,y:0,width:width,height:height)).fill()
   let gold=NSColor(srgbRed:0.894,green:0.773,blue:0.584,alpha:1)
   text("CATALYST / GUIDED WALKTHROUGH",CGRect(x:80,y:965,width:750,height:30),NSFont.systemFont(ofSize:16,weight:.medium),gold)
   text(segment.title,CGRect(x:80,y:680,width:650,height:240),NSFont(name:"Georgia",size:65)!,NSColor.white)
   text(segment.subtitle,CGRect(x:84,y:550,width:550,height:110),NSFont.systemFont(ofSize:24,weight:.regular),NSColor(srgbRed:0.72,green:0.79,blue:0.8,alpha:1))
   text("\(String(format:"%02d",i+1)) / 07",CGRect(x:84,y:400,width:400,height:50),NSFont(name:"Georgia",size:40)!,gold)
   text("Aayush Keshari\nNipun Chandra\nShivam Kharangate",CGRect(x:84,y:150,width:500,height:150),NSFont.systemFont(ofSize:21,weight:.regular),NSColor(srgbRed:0.76,green:0.81,blue:0.81,alpha:1))
   text("Synthetic narration · captured prototype states\nIndependent student project · demo data only",CGRect(x:84,y:65,width:700,height:65),NSFont.systemFont(ofSize:15,weight:.regular),NSColor(srgbRed:0.61,green:0.69,blue:0.72,alpha:1))
   let box=CGRect(x:810,y:110,width:1030,height:860)
   NSColor(srgbRed:0.965,green:0.957,blue:0.937,alpha:1).setFill();NSBezierPath(roundedRect:box,xRadius:16,yRadius:16).fill()
   let scale=min((box.width-20)/screenshot.size.width,(box.height-20)/screenshot.size.height)
   let size=CGSize(width:screenshot.size.width*scale,height:screenshot.size.height*scale)
   let imageRect=CGRect(x:box.midX-size.width/2,y:box.midY-size.height/2,width:size.width,height:size.height)
   screenshot.draw(in:imageRect)
   NSColor(srgbRed:0.2,green:0.29,blue:0.32,alpha:1).setFill();NSBezierPath(rect:CGRect(x:0,y:0,width:width,height:5)).fill()
   gold.setFill();NSBezierPath(rect:CGRect(x:0,y:0,width:Double(width)*(start+Double(frame)/2)/total,height:5)).fill()
   NSGraphicsContext.restoreGraphicsState();CVPixelBufferUnlockBaseAddress(pixel,[])
   let t=CMTime(seconds:start+Double(frame)/2,preferredTimescale:600);adaptor.append(pixel,withPresentationTime:t)
  }
 }
 start+=Double(count)/2
}
input.markAsFinished();writer.endSession(atSourceTime:CMTime(seconds:start,preferredTimescale:600))
let videoDone=DispatchSemaphore(value:0);writer.finishWriting{videoDone.signal()};videoDone.wait();guard writer.status == .completed else{fatalError("Video writer failed: \(String(describing:writer.error))")}
let composition=AVMutableComposition();let videoTrack=composition.addMutableTrack(withMediaType:.video,preferredTrackID:kCMPersistentTrackID_Invalid)!
let silent=AVURLAsset(url:videoURL);try videoTrack.insertTimeRange(CMTimeRange(start:.zero,duration:silent.duration),of:silent.tracks(withMediaType:.video)[0],at:.zero)
let audioTrack=composition.addMutableTrack(withMediaType:.audio,preferredTrackID:kCMPersistentTrackID_Invalid)!
var offset:Double=0
var captions="WEBVTT\n\n"
func stamp(_ seconds:Double)->String{let m=Int(seconds*1000);return String(format:"%02d:%02d:%02d.%03d",m/3600000,(m/60000)%60,(m/1000)%60,m%1000)}
for (i,audio) in audioAssets.enumerated(){try audioTrack.insertTimeRange(CMTimeRange(start:.zero,duration:audio.duration),of:audio.tracks(withMediaType:.audio)[0],at:CMTime(seconds:offset,preferredTimescale:600));let sentences=segments[i].narration.split(separator:".").map{String($0).trimmingCharacters(in:.whitespaces)}.filter{!$0.isEmpty};let length=CMTimeGetSeconds(audio.duration);let words=Double(sentences.reduce(0){$0+$1.split(separator:" ").count});var cue=offset;for sentence in sentences{let d=length*Double(sentence.split(separator:" ").count)/words;captions+="\(stamp(cue)) --> \(stamp(cue+d))\n\(sentence).\n\n";cue+=d};offset+=Double(Int(ceil(durations[i]*2)))/2}
try captions.write(to:cwd.appendingPathComponent("static/demo-captions.vtt"),atomically:true,encoding:.utf8)
let output=cwd.appendingPathComponent("static/demo.mp4");try? FileManager.default.removeItem(at:output)
let export=AVAssetExportSession(asset:composition,presetName:AVAssetExportPreset1920x1080)!
export.outputURL=output;export.outputFileType = .mp4;export.shouldOptimizeForNetworkUse=true
let done=DispatchSemaphore(value:0);export.exportAsynchronously{done.signal()};done.wait();guard export.status == .completed else{fatalError("Export failed: \(String(describing:export.error))")}
let report=["durationSeconds":offset,"width":1920,"height":1080,"syntheticNarration":true,"capturedInterfaceStates":true] as [String:Any]
let reportData=try JSONSerialization.data(withJSONObject:report,options:.prettyPrinted);try reportData.write(to:cwd.appendingPathComponent("docs/demo-video-metadata.json"))
print("Saved static/demo.mp4: \(offset) seconds")
