import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Layers } from 'lucide-react';
import { GraphNode, GraphLink } from '../types';

interface RelationshipGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

export default function RelationshipGraph({ nodes, links }: RelationshipGraphProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const updateDimensions = () => {
      if (!svgRef.current) return;
      const width = svgRef.current.clientWidth;
      const height = svgRef.current.clientHeight;
      
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const simulation = d3.forceSimulation(nodes as any)
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(width < 500 ? 60 : 100))
        .force("charge", d3.forceManyBody().strength(width < 500 ? -100 : -200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(width < 500 ? 20 : 30));

      const link = svg.append("g")
        .attr("stroke", "#ffffff0a")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value) * (width < 500 ? 1 : 2));

      const node = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .call(d3.drag<any, any>()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any);

      node.append("circle")
        .attr("r", width < 500 ? 5 : 6)
        .attr("fill", d => d.sentiment > 0 ? "#00D2FF" : (d.sentiment < 0 ? "#FF0055" : "#6366F1"))
        .attr("stroke", d => d.sentiment > 0 ? "rgba(0,210,255,0.3)" : (d.sentiment < 0 ? "rgba(255,0,85,0.3)" : "rgba(99,102,241,0.3)"))
        .attr("stroke-width", 4)
        .style("cursor", "crosshair");

      node.append("text")
        .attr("dx", width < 500 ? 10 : 12)
        .attr("dy", ".35em")
        .text(d => d.label)
        .attr("fill", "#64748B")
        .attr("font-size", width < 500 ? "7px" : "8px")
        .attr("font-family", "JetBrains Mono")
        .attr("font-weight", "900")
        .attr("letter-spacing", "0.1em")
        .text(d => d.label.toUpperCase());

      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      });

      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return simulation;
    };

    const simulation = updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      simulation.stop();
      updateDimensions();
    });

    resizeObserver.observe(svgRef.current);

    return () => {
      simulation.stop();
      resizeObserver.disconnect();
    };
  }, [nodes, links]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-panel-bg/40 border border-card-border rounded-lg">
      <div className="panel-header bg-transparent border-none">
        <div className="flex items-center gap-2">
          <Layers className="w-3 h-3 text-brand-primary" />
          <h2 className="panel-title">RELATIONAL_MATRIX [GRAPH_01]</h2>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />
      <svg ref={svgRef} className="w-full h-full relative z-10" />
    </div>
  );
}
